import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from "../../utils";

export const __addToDo = createAsyncThunk(
    "__addToDo",
    async (payload, thunkAPI) => {
        await waitTwoSeconds();
        const response = thunkAPI.fulfillWithValue(payload);
        return response;
    },
);

export const __deleteTodo = createAsyncThunk(
    "__deleteToDo",
    async (payload, thunkAPI) => {
        await waitTwoSeconds();
        const response = thunkAPI.fulfillWithValue(payload);
        return response;
    },
);

const initialState = {
    list: [],
    isLoading: false,
};

const todosSlice = createSlice({
    name: "todos",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(__addToDo.fulfilled, (state, action) => {
                return {
                    isLoading: false,
                    list: [action.payload, ...state.list],
                };
            })
            .addCase(__addToDo.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(__deleteTodo.fulfilled, (state, action) => {
                return {
                    isLoading: false,
                    list: state.list.filter(item => item.id !== action.payload),
                };
            })
            .addCase(__deleteTodo.pending, (state, action) => {
                state.isLoading = true;
            });
    },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
