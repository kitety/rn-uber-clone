import { create } from 'zustand';
import { IDriverStore, ILocationStore, IMarkerData } from '~/types/type';

export const useLocationStore = create<ILocationStore>((set) => ({
  userAddress: null,
  userLongitude: null,
  userLatitude: null,
  destinationAddress: null,
  destinationLongitude: null,
  destinationLatitude: null,
  setUserLocation: ({
    address,
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userAddress: address,
      userLatitude: latitude,
      userLongitude: longitude,
    }));
  },
  setDestinationLocation: ({
    address,
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) =>
    set({
      destinationAddress: address,
      destinationLatitude: latitude,
      destinationLongitude: longitude,
    }),
}));

export const useDriverStore = create<IDriverStore>((set) => ({
  drivers: [] as IMarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId: number) => set(() => ({ selectedDriver: driverId })),
  setDrivers: (drivers: IMarkerData[]) => set(() => ({ drivers })),
  clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}));
