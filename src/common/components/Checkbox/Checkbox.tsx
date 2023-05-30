import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react'
import s from 'common/components/Checkbox/styles.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement>

type SuperCheckboxPropsType = Omit<DefaultInputPropsType, 'type'> & {
  onChangeChecked?: (checked: boolean) => void
  spanClassName?: string
}

const Checkbox: React.FC<SuperCheckboxPropsType> = (
  {
    onChange,
    onChangeChecked,
    className,
    spanClassName,
    children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC
    id,

    ...restProps // все остальные пропсы попадут в объект restProps
  }
) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    // задачка на написание онченджа
    if (onChangeChecked) {
      console.log(e.currentTarget.checked)
      onChangeChecked(e.currentTarget.checked)
    }
  }

  const finalInputClassName = s.checkbox
    + (className ? ' ' + className : '')

  // Извлекаем значение checked из restProps
  const { checked, ...inputProps } = restProps;
  console.log(checked)

  return (
    <div className={s.checkboxWrapper}>
      <label className={s.label}>
        <input
          id={id}
          type={'checkbox'}
          onChange={onChangeCallback}
          className={finalInputClassName}
          {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
        />
        {children && (
          <span
            id={id ? id + '-span' : undefined}
            className={s.spanClassName}
          >
          {children}
        </span>
        )}
      </label>
      {/*// благодаря label нажатие на спан передастся в инпут*/}
    </div>
  )
}

export default Checkbox
