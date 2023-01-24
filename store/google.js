export const state = () => ({
  dataList: [],
  keyword: null
});

export const mutations = {
  setData: (state, data) => {
    state.dataList = data;
  },
  setKeyword: (state, data) => {
 
    state.keyword = data;
    console.log(state)
  },
};

export const actions = {
  async fetchGoogleMap({ commit,state }, payload) {
    
    return new Promise((resolve, reject) => {
   
      if(payload.keyword === state.keyword){
        resolve(state.dataList);
        return;
      }
      commit("setKeyword", payload.keyword);
      this.$axios
        .$get("/google/getList", {
          params: payload,
        })
        .then((result) => {
       
          commit("setData", result);
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
