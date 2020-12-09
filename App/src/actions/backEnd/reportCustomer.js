import * as ep from "./../../constants/enpoint";
export const types = {
  GET_REPORT_CUSTOMER_SUCCESS: "GET_REPORT_CUSTOMER_SUCCESS",
  GET_REPORT_CUSTOMER_ERROR: "GET_REPORT_CUSTOMER_ERROR",
};

export const getReportCustomer = (filter) => {
  return {
      url: `${ep.enpoint}/api/report/customer?fromDate=2020-12-1&toDate=2020-12-30`,
      method: "get",
      onSuccess: types.GET_REPORT_CUSTOMER_SUCCESS,
      onError: types.GET_REPORT_CUSTOMER_ERROR,
  };
};
