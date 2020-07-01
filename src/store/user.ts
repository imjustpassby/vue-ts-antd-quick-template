import { ActionTree, MutationTree } from 'vuex';
import { StateRoot } from '@/store/index';
interface IStateUser {
  loginSuccess: 'true' | 'false';
}

export const namespaced: Boolean = true;

export const state: IStateUser = {
  loginSuccess: window.sessionStorage.getItem('loginSuccess') ? 'true' : 'false'
};

export const mutations: MutationTree<IStateUser> = {
  SET_LOGIN_SUCCESS: (state, isSuccess: 'true' | 'false') => {
    state.loginSuccess = isSuccess;
    window.sessionStorage.setItem('loginSuccess', isSuccess);
  }
};

export const actions: ActionTree<IStateUser, StateRoot> = {
  LOGIN: ({ commit }) => {
    // login api
    commit('SET_LOGIN_SUCCESS', 'true');
  },
  LOGOUT: ({ commit }) => {
    // logout api
    commit('SET_LOGIN_SUCCESS', 'false');
  }
};
