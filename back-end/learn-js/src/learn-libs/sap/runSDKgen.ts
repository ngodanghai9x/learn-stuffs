import { DestinationOrFetchOptions } from "@sap-cloud-sdk/connectivity";
import moment from "moment-timezone";
import {
  batch,
  changeset,
  activityService,
} from "./generated/activity-service";
import {
  contactService,
  Contact,
  EmployeeBasicData,
} from "./generated/contact-service";
import { leadService } from "./generated/lead-service";
import { opportunityService } from "./generated/opportunity-service";
// import { TasksApi } from '.././generated/c-4-codata-service/TasksApi';
// import {
//   SAP_TASK_DEFAULT_COMPLETION,
//   SAP_TASK_DEFAULT_PRIORITY,
//   SAP_TASK_DEFAULT_STATUS,
//   SAP_TASK_DEFAULT_TASK_NOTE_TYPE,
//   SAP_TASK_DEFAULT_TYPE,
//   TIME_ZONE,
//   TIME_ZONE_CODE,
// } from '../const';
import {
  and,
  DeSerializers,
  endsWith,
  Filter,
  startsWith,
} from "@sap-cloud-sdk/odata-common/internal";
import { substringOf, or } from "@sap-cloud-sdk/odata-v2";
// @sap-cloud-sdk/connectivity @sap-cloud-sdk/odata-v4 @sap-cloud-sdk/odata-common @sap-cloud-sdk/odata-v2

export const SAP_TASK_DEFAULT_TASK_NOTE_TYPE = "10002"; // Notes
export const SAP_TASK_DEFAULT_TYPE = "0006"; // Meeting
export const SAP_TASK_DEFAULT_STATUS = "3"; // Completed
export const SAP_TASK_DEFAULT_PRIORITY = "3"; // Normal
export const SAP_TASK_DEFAULT_COMPLETION = 100 as any;
