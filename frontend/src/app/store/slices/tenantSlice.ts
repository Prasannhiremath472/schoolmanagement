import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TenantState {
  slug: string | null;
  name: string | null;
  logo: string | null;
  primaryColor: string;
  secondaryColor: string;
}

const initialState: TenantState = {
  slug: localStorage.getItem('tenantSlug'),
  name: localStorage.getItem('tenantName'),
  logo: null,
  primaryColor: '#1976d2',
  secondaryColor: '#dc004e',
};

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    setTenant: (state, action: PayloadAction<Partial<TenantState>>) => {
      Object.assign(state, action.payload);
      if (action.payload.slug) localStorage.setItem('tenantSlug', action.payload.slug);
      if (action.payload.name) localStorage.setItem('tenantName', action.payload.name);
    },
    clearTenant: (state) => {
      state.slug = null;
      state.name = null;
      state.logo = null;
      localStorage.removeItem('tenantSlug');
      localStorage.removeItem('tenantName');
    },
  },
});

export const { setTenant, clearTenant } = tenantSlice.actions;
export default tenantSlice.reducer;
