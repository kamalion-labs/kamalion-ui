export type NotNullableKeys<Type> = {
  [Key in keyof Type]-?: NotNullableKeys<NonNullable<Type[Key]>>;
};
