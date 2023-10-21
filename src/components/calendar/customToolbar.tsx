import React, { useCallback } from 'react'
import { BackArrow, ForwardArrow } from '../../lib/icons'
import PageTitle from '../pageTitle'

export interface ICustomTooolbarProps {
  view: string
  views: string[]
  label: any
  localizer: any
  onNavigate: (action: any) => void
  onView: (view: any) => void
  onViewChange: (view: any) => void
  messages: any
}

export const navigateContants = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE',
}

export const views = {
  MONTH: 'month',
  WEEK: 'week',
  WORK_WEEK: 'work_week',
  DAY: 'day',
  AGENDA: 'agenda',
}

const CustomToolbar: React.FC<ICustomTooolbarProps> = props => {
  const navigate = (action: any) => {
    props.onNavigate(action)
  }

  const viewItem = (view: string) => {
    props.onView(view)
  }

  const viewNamesGroup = useCallback(() => {
    const { views, view } = props
    if (views.length > 1) {
      return views.map(name => {
        return (
          <button
            type="button"
            key={name}
            className={`btn btn-sm ${view === name ? 'rbc-active' : ''}`}
            onClick={() => viewItem(name)}
          >
            {props.localizer.messages[name]}
          </button>
        )
      })
    }
  }, [props])

  return (
    <div className="rbc-toolbar pr-5 pl-5 mt--7 mb--7 !mb-0">
      <PageTitle title="Events" />
      <span className="rbc-btn-group btn-group ml-10">
        <button
          type="button"
          className={`btn btn-sm rounded ${props.view === 'agenda' ? 'btn-disabled' : ''}`}
          onClick={() => navigate(navigateContants.PREVIOUS)}
        >
          <BackArrow />
        </button>
        <button className="btn btn-sm" type="button" onClick={() => navigate(navigateContants.TODAY)}>
          Today
        </button>
        <button
          type="button"
          className={`btn btn-sm rounded ${props.view === 'agenda' ? 'btn-disabled' : ''}`}
          onClick={() => navigate(navigateContants.NEXT)}
        >
          <ForwardArrow />
        </button>
      </span>

      <span className="rbc-toolbar-label font-bold">{props.label}</span>

      <span className="rbc-btn-group btn-group">{viewNamesGroup()}</span>
    </div>
  )
}

export default CustomToolbar
