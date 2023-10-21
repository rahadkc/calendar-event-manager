import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EventFormDataType, EventSchema } from './schema'
import InputField from '../../ui/input'
import DateTimePicker from '../../ui/dateTimePicker'
import Checkbox from '../../ui/checkbox'
import Select from '../../ui/select'
import { RECURRING_ARR, RECURRING_TYPE } from '../../../lib/constants'
import Grid from '../../ui/grid'
import Button, { ButtonVariant } from '../../ui/button'
import FormControl from '../../ui/formControl'
import Textarea from '../../ui/textarea'
import { ChangeEvent, MouseEvent, memo, useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { selectEvent, setEventData } from '../../../redux/reducers/events/eventsSlice'
import DeleteEventModal from '../../calendar/deleteEventModal'
import BooleanWrapper from '../../booleanWrapper'
import { formatISO, parseISO } from '../../../lib/date'

type EventFormProps = {
  defaultTime?: Date
  selectedEvent?: EventFormDataType
  handleSubmitForm: (data: any) => void
  handleClose: () => void
  handleDeleteModalOpen?: () => void
  isMutating?: boolean
  isEdit?: boolean
}

const EventForm = ({
  defaultTime,
  selectedEvent,
  handleSubmitForm,
  handleClose,
  isMutating,
  isEdit = false,
}: EventFormProps) => {
  const event = useAppSelector(selectEvent)
  const dispatch = useAppDispatch()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  let timeStringForLocalInput =
    typeof event.start === 'string'
      ? formatISO(parseISO(`${event.start}`)).slice(0, 16)
      : formatISO(event.start).slice(0, 16)

  const {
    register,
    reset,
    formState: { errors, isDirty },
    handleSubmit,
    clearErrors,
    watch,
  } = useForm<EventFormDataType>({
    resolver: zodResolver(EventSchema),
    defaultValues: selectedEvent
      ? selectedEvent
      : {
          title: '',
          start: timeStringForLocalInput,
          end: '',
          allDay: false,
          recurring: RECURRING_TYPE.NONE,
        },
  })

  const [endMinValue, setEndMinValue] = useState(timeStringForLocalInput)

  const onSubmit = (data: any) => {
    handleSubmitForm(data)
    reset()
  }

  const handleCancel = useCallback((e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    clearErrors()
    reset()
    handleClose()
  }, [])

  const handleDateChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEndMinValue(e.target.value)
    dispatch(setEventData({ ...event, start: new Date(e.target.value) }))
  }, [])

  const handleDeleteModal = useCallback((e?: MouseEvent<HTMLElement>) => {
    e?.preventDefault()
    setOpenDeleteModal(prev => !prev)
  }, [])

  return (
    <>
      <form>
        <Grid cols={1}>
          <FormControl fieldLabel="Title" helperText={errors?.title?.message}>
            <InputField {...register('title')} autoFocus hasError={'title' in errors} />
          </FormControl>
        </Grid>
        <Grid cols={1}>
          <FormControl fieldLabel="Description">
            <InputField {...register('description')} placeholder="" />
          </FormControl>
        </Grid>

        <Grid cols={2} gap={4} customClass="grid-cols-2 gap-4">
          <FormControl fieldLabel="Start">
            <DateTimePicker
              {...register('start')}
              onChange={handleDateChange}
              min={timeStringForLocalInput}
            />
          </FormControl>
          <FormControl fieldLabel="End" helperText={errors?.end?.message}>
            <DateTimePicker {...register('end')} min={endMinValue} hasError={'end' in errors} />
          </FormControl>
        </Grid>

        <Grid customClass="grid-cols-3">
          <FormControl>
            <Checkbox {...register('allDay')} label="All Day" />
          </FormControl>
        </Grid>
        <Grid cols={3} gap={4} customClass="grid-cols-3 gap-4">
          <FormControl fieldLabel="Repeat">
            <Select {...register('recurring')} options={RECURRING_ARR} />
          </FormControl>
          <FormControl fieldLabel="Count" helperText={errors?.count?.message}>
            <InputField
              {...register('count')}
              disabled={watch('recurring') === 'none'}
              type="number"
              hasError={'count' in errors}
              min={1}
            />
          </FormControl>
          <FormControl fieldLabel="Interval" helperText={errors?.interval?.message}>
            <InputField
              {...register('interval')}
              disabled={watch('recurring') === 'none'}
              type="number"
              hasError={'interval' in errors}
              min={1}
            />
          </FormControl>
        </Grid>

        <Grid>
          <FormControl fieldLabel="Note">
            <Textarea {...register('note')} />
          </FormControl>
        </Grid>

        <Grid gap={4} customClass="grid-flow-col gap-4 mt-7">
          <BooleanWrapper shouldRender={isEdit}>
            <Button onClick={handleDeleteModal} variant={ButtonVariant.WARNING}>
              Delete
            </Button>
          </BooleanWrapper>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            variant={ButtonVariant.PRIMARY}
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty}
            isLoading={isMutating}
          >
            Save
          </Button>
        </Grid>
      </form>

      <DeleteEventModal
        open={openDeleteModal}
        handleClose={handleDeleteModal}
        handleEditModalClose={handleClose}
        eventId={selectedEvent?._id || ''}
      />
    </>
  )
}

export default memo(EventForm)
