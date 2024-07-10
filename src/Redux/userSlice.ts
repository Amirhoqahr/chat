import { createSlice } from '@reduxjs/toolkit'
const initialState = {}

const userSlice = createSlice({
    name: "user",
    initialState,
  reducers: {
    setUser:(state, action) => {},
    setUsers:(state, action) => {},
  }
})

export const {setUser, setUsers} = userSlice.actions;
export default userSlice.reducer