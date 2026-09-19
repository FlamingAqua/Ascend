import {setGlobalOptions} from "firebase-functions";

setGlobalOptions({maxInstances: 10});

export {askMentor} from "./ai/chat";
