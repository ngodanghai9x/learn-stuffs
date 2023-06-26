const moment = require('moment')
console.log({
  abc: moment(`2022-07-03T23:44:51.000Z`).format(`DD/MM/YYYY`),
  abc2: moment(`2022-07-03T23:44:51.000Z`).utc().format(`DD/MM/YYYY`),
  abc3: moment(`2022-07-02T12:21:09.000Z`).format(`DD/MM/YYYY`),
  abc4: moment(`2022-07-02T12:21:09.000Z`).utc().format(`DD/MM/YYYY`),
  abc5: moment(`2022-07-01T23:42:17.000Z`).format(`DD/MM/YYYY`),
  abc6: moment(`2022-07-01T23:42:17.000Z`).utc().format(`DD/MM/YYYY`),
})
// {
//   "date": "2022-07-03T23:44:51.000Z",
//   "data_completeness": 0.961136379,
//   "mapping_quality": 0.856062733,
//   "source_coverage": 0.96534519,
//   "fintech_coverage": 0.964796804,
//   "overall_health": 0.936835277
// },
// {
//   "date": "2022-07-02T12:21:09.000Z",
//   "data_completeness": 0.961144865,
//   "mapping_quality": 0.856062733,
//   "source_coverage": 0.96534519,
//   "fintech_coverage": 0.965302579,
//   "overall_health": 0.936963842
// },
// {
//   "date": "2022-07-01T23:42:17.000Z",
//   "data_completeness": 0.961144865,
//   "mapping_quality": 0.8578168,
//   "source_coverage": 0.965345191,
//   "fintech_coverage": 0.965302579,
//   "overall_health": 0.937402359
// },
// {
//   "date": "2022-06-30T23:44:58.000Z",
//   "data_completeness": 0.960999288,
//   "mapping_quality": 0.8578168,
//   "source_coverage": 0.965344015,
//   "fintech_coverage": 0.965301442,
//   "overall_health": 0.937365386
// },