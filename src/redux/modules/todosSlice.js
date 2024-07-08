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
};

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.list.push(action.payload);
        },
        deleteTodo: (state, action) => {
            return state.list.filter(item => item.id !== action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(__addToDo.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(__deleteTodo.fulfilled, (state, action) => {
                return {
                    ...state,
                    list: state.list.filter(item => item.id !== action.payload),
                };
            });
    },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
