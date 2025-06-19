import { configureStore } from "@reduxjs/toolkit";
import BookmarkHeaderSlice from "./Reducers/BookmarkHeaderSlice";
import LayoutSlice from "./Reducers/LayoutSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";

const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    bookmarkHeader:BookmarkHeaderSlice,
    themeCustomizer: ThemeCustomizerSlice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
