export const customDayPropGetter = (date: any) => {
  const currentDate = new Date()
  if (date < currentDate)
    return {
      className: 'disabled-day',
      style: {
        cursor: 'not-allowed',
        background: 'rgba(184, 184, 184, 0.1)',
      },
    }
  else return {}
}

export const setEventCellStyling = (event: any) => {
  if (event.background) {
    let style = {
      background: 'rgba(7, 97, 125, 0.1)',
      border: `1px solid ${event.background}`,
      color: 'var(--accent-color)',
      borderLeft: `3px solid ${event.background}`,
      fontWeight: 600,
      fontSize: '11px',
    }
    return { style }
  }
  let style = {
    background: 'rgba(7, 97, 125, 0.1)',
    border: '1px solid var(--accent-color)',
    color: 'var(--accent-color)',
    borderLeft: '3px solid var(--accent-color)',
    borderRadius: '0px',
    fontWeight: 600,
    fontSize: '11px',
  }
  return { style }
}
