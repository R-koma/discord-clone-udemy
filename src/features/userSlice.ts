import { createSlice } from "@reduxjs/toolkit";
import { InitialUserState } from "../Types";

const initialState: InitialUserState = {
  user: null,
};

// createSliceを作る理由は、ユーザーのログイン・ログアウトの状態を監視するために作る。
export const userSlice = createSlice({
  name: "user",
  // initialState: initialState,このようにプロパティと変数名が同じ場合は以下のように省略できる。
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; //action.payloadは他のファイルでdispatch操作され、それによってstate.user状態が更新されるというもの。
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

console.log(userSlice);

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
