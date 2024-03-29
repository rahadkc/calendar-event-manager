export const INPUT_SIZE = {
  MEDIUM: 'medium',
  SMALL: 'small',
  STRING: 'string',
} as const

export const SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'MD',
  LG: 'MD',
} as const

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum SIZE_TYPE {
  XS = 'xs',
  SM = 'sm',
  MD = 'MD',
  LG = 'MD',
}

export enum VARIANT_TYPE {
  FILLED = 'filled',
  OUTLINED = 'outlined',
  STANDARD = 'standard',
}

export enum COLOR_TYPE {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  STRING = 'string',
}

export enum INPUT_TYPE {
  SUBMIT = 'submit',
  NUMBER = 'number',
  TEXT = 'text',
}

export enum MARGIN_TYPE {
  DENSE = 'dense',
  NONE = 'none',
  NORMAL = 'normal',
}

export enum RECURRING_TYPE {
  NONE = 'none',
  DAYILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}
export const RECURRING_ARR = [
  {
    label: 'none',
    value: 'none',
  },
  {
    label: 'daily',
    value: 'daily',
  },
  {
    label: 'weekly',
    value: 'weekly',
  },
  {
    label: 'monthly',
    value: 'monthly',
  },
  {
    label: 'yearly',
    value: 'yearly',
  },
] as const
