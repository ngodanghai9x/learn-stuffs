import React from 'react';

function MyTooltip(props) {
  const {
    comp,
    text,
    id,
    className,
    onClick,
    style,
    place,
    tooltipClassName,
    delayHide,
    delayShow,
    isCapture,
    offSet
  } = props;
  
  return (
    <React.Fragment>
      <div
        data-tip
        data-for={id}
        className={className}
        onClick={onClick}
        style={style}
      >
        <span style={`maxWidth=100%, width=fit-content, inline-block`}>
          {comp || text}
        </span>
      </div>
      {
        text && (
          <ReactTooltip
            id={id}
            place={place}
            effect="solid"
            className={tooltipClassName}
            delayShow={delayShow}
            delayHide={delayHide}
            globalEventOff="click"
            isCapture={isCapture}
            offSet={offSet}
          >
            {text}
          </ReactTooltip>
        )
      }
    </React.Fragment >
  )
}