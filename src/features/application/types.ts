export type ApplicationFormValues = {
  name: string
  contact: string
  message: string
}

export type ApplicationPayload =
  ApplicationFormValues & {
    vacancyId: string
  }

export type ApplicationFormErrors = Partial<
  Record<keyof ApplicationFormValues, string>
>