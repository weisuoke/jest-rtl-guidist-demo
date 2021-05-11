import { createMachine, intercept } from "xstate";

const promiseMachine = createMachine({
  id: "promise",
  initial: "pending",
  states: {
    pending: {
      on: {
        RESOLVE: "resolved",
        REJECTED: "rejected",
      },
    },
    resolved: {
      type: "final",
    },
    rejected: {
      type: "final",
    },
  },
});

const promiseService = intercept(promiseMachine).onTransition((state) => {
  console.log(state.value);
});

// Start the service
promiseService.start();
// => pending

promiseService.send("RESOLVE");
// => resolved
