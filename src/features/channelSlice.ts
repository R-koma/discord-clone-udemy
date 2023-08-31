import { createSlice } from "@reduxjs/toolkit";
import { InitialChannelState } from "../Types";

const initialState: InitialChannelState = {
  channelId: null,
  channelName: null,
};

// createSliceを作る理由は、ユーザーのログイン・ログアウトの状態を監視するために作る。
export const channelSlice = createSlice({
  name: "channel",
  // initialState: initialState,このようにプロパティと変数名が同じ場合は以下のように省略できる。
  initialState,
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
  },
});

export const { setChannelInfo } = channelSlice.actions;
export default channelSlice.reducer;
