import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import config from '../../config/config'

const initialState = {
    isLoading: false,
    users: [],
    isError: false
}

export const fetchUser = createAsyncThunk("fetchUser", async () => {
    try {
        const { data } = await config.get("")
        return data
    } catch (error) {
        throw (error)
    }
})

export const addNewUser = createAsyncThunk("addNewUser", async (userData) => {
    try {
        const newUser = await config.post("/register", userData)
        return newUser
    } catch (error) {
        throw (error)
    }
})

export const fetchUserById = createAsyncThunk("fetchUserById", async (id) => {
    try {
        const { data } = await config.get(`/user/${id}`)
        return data
    } catch (error) {
        throw (error)
    }
})

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
    try {
        const { data } = await config.delete(`/delete-user/${id}`)
        return data
    } catch (error) {
        throw (error)
    }

})

export const updateUserById = createAsyncThunk('updateUser', async ({ id, updatedData }) => {
    try {
        const data = await config.patch(`/update-user/${id}`, updatedData)
        return data
    } catch (error) {
        throw (error)
    }
})


const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.users = action.payload
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isError = true
        })
        builder.addCase(addNewUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(addNewUser.fulfilled, (state, action) => {
            state.users = action.payload
        })
        builder.addCase(addNewUser.rejected, (state, action) => {
            state.isLoading = true
            state.isError = true
        })
        builder.addCase(fetchUserById.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            state.users = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchUserById.rejected, (state, action) => {
            state.isError = true
            state.isLoading = true
        })
        builder.addCase(deleteUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.isError = true
        })
        builder.addCase(updateUserById.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(updateUserById.fulfilled, (state, action) => {
            state.users = action.payload
        })
        builder.addCase(updateUserById.rejected, (state, action) => {
            state.isError = true
        })
    }
})


export default userSlice.reducer