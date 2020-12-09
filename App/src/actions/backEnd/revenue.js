import * as ep from "./../../constants/enpoint";
export const types = {
  GET_REVENUE_SUCCESS: "GET_REVENUE_SUCCESS",
  GET_REVENUE_ERROR: "GET_REVENUE_ERROR",
};

export const getRevenue = (filter) => {
  return {
      url: `${ep.enpoint}/api/report/revenue?fromDate=2020-12-1&toDate=2020-12-30`,
      method: "get",
      onSuccess: types.GET_REVENUE_SUCCESS,
      onError: types.GET_REVENUE_ERROR,
  };
};
