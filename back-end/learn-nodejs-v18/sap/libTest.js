import { taskService } from '@sap/cloud-sdk-op-vdm-task-service';

const { tas } = taskService()
const resultPromise = taskCodeApi.requestBuilder().getAll().top(5).execute({ destinationName:'myDestinationName' });
