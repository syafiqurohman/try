import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/api";
const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    menuList: {},
}

export const LoginUser = createAsyncThunk("user/LoginUser", async (user, { rejectWithValue }) => {
    const response = await api().post('/login', {
        username: user.username,
        password: user.password
    }).then((e) => {
        return e.data
    }).catch((e) => {
        return rejectWithValue(e);
    });
    return response;
});

export const getMe = createAsyncThunk("user/getMe", async (_, {rejectWithValue}) => {
    const response = await api().get('/me').then((e) => {
        return e.data
    }).catch((e) => {
        return rejectWithValue(e);
    });
    return response;
});

export const LogOut = createAsyncThunk("user/LogOut", async () => {
    await api().post('/api/logout');
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload.user;
            localStorage.setItem('token', action.payload.token);
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

        // Get User Login
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload.user;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            localStorage.removeItem('token');
            state.message = action.payload;
        })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;