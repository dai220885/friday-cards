import React from "react";
import {Slider, SliderProps} from "@mui/material";
import s from "common/components/Range/styles.module.css"


export const Range: React.FC<SliderProps> = (props) => {

  return (
    <div className={s.rangeWrapper}>
      <Slider
        sx={
          {
            color: '#366EFF',
            width: 147,
            height: 4,
            '& .MuiSlider-thumb': {
              height: 18,
              width: 18,
              backgroundColor: '#fff',
              border: '1px solid #366EFF',
              '&:before': {
                borderRadius: '50%',
                border: '1px solid #366EFF',
                backgroundColor: '#366EFF',
                width: 6,
                height: 6,
                boxShadow: 'none',
              },
            },
            '& .MuiSlider-track': {
              backgroundColor: '#366EFF',
              border: '1px solid #366EFF'
            },
            '& .MuiSlider-rail': {
              backgroundColor: '#366EFF80',
              border: '1px solid #366EFF80'
            },
          }
        }
        {...props}
      />
    </div>
  )
}
