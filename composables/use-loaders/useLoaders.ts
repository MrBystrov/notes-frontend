import { type Ref, ref } from 'vue';

interface IUseLoader<TLoader = string> {
  loaders: Ref<Set<TLoader>>;
  startLoader: (loaderId: TLoader) => void;
  endLoader: (loaderId: TLoader) => void;
}

export const useLoaders = <TLoader = string>(): IUseLoader<TLoader> => {
  const loaders = ref<Set<TLoader>>(new Set<TLoader>()) as Ref<Set<TLoader>>;

  const startLoader = (loaderId: TLoader) => {
    loaders.value.add(loaderId);
  };

  const endLoader = (loaderId: TLoader) => {
    loaders.value.delete(loaderId);
  };

  return {
    loaders,
    startLoader,
    endLoader
  };
};