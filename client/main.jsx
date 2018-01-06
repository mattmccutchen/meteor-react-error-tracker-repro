import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var globalCounter;

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  globalCounter = this.counter;
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  testReactComponent() {
    return TestReactComponent;
  }
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.testMeteor.helpers({
  testMeteorHelper() {
    let counterValue = globalCounter.get();
    if (counterValue % 4 == 0) {
      throw new Error("Unhandled exception from Meteor");
    }
    return "Meteor: " + counterValue;
  }
});

class TestReactInner extends React.Component {
  render() {
    let counterValue = this.props.counterValue;
    if (counterValue % 4 == 0) {
      throw new Error("Unhandled exception from React render");
    }
    return <span>React: {counterValue}</span>;
  }
}

var TestReactComponent = withTracker(() => {
  let counterValue = globalCounter.get();
  if (counterValue % 4 == 2) {
    throw new Error("Unhandled exception from React withTracker");
  }
  return {counterValue};
})(TestReactInner);
