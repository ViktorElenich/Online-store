/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import './ModalPurchasePage.scss';
import visaIcon from '../../assets/visa-icon.png';
import masterCardIcon from '../../assets/mastercard-icon.png';
import amExpressIcon from '../../assets/amexpress-icon.png';
import otherCardIcon from '../../assets/othercard-icon.png';
import ProcessingModal from './ProcessingModal';
import { IOpenHideModal } from '../../interfaces';

const ModalPurchasePage: FC<IOpenHideModal> = ({ handleClose, show }) => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [openRedirect, setOpenRedirect] = useState(false);

  const modalClassName = show ? 'modal-darkbg modal-show' : 'modal-darkbg';

  const creditCardRef = useRef<HTMLDivElement | null>(null);

  const validateNumericField = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const ccLogo = creditCardRef.current as HTMLDivElement;

    if (target.name === 'cc1') {
      if (target.value[0] === '4') {
        ccLogo.style.backgroundImage = `url(${visaIcon})`;
      } else if (target.value[0] === '5') {
        ccLogo.style.backgroundImage = `url(${masterCardIcon})`;
      } else if (target.value[0] === '6') {
        ccLogo.style.backgroundImage = `url(${amExpressIcon})`;
      } else ccLogo.style.backgroundImage = `url(${otherCardIcon})`;
    }

    if (target.value.length > target.maxLength) {
      target.value = target.value.substring(0, target.maxLength);
      return;
    }

    if (target.name === 'month') {
      if (+target.value > 12) {
        target.value = '12';
      }
    }
  };

  const onSubmit = () => {
    handleClose();
    setOpenRedirect(true);
  };

  const resetAllFields = () => {
    reset();
    clearErrors();
  };

  return (
    <>
      {openRedirect ? (
        <ProcessingModal
          handleClose={() => setOpenRedirect(false)}
          show={openRedirect}
        />
      ) : (
        ''
      )}
      <div
        className={modalClassName}
        onClick={(e) => {
          e.stopPropagation();
          if (!(e.target as HTMLDivElement).classList.contains('modal-darkbg'))
            return;
          handleClose();
        }}
      >
        <div className='modal-wrapper'>
          <form
            action='submit'
            className='personal-details'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='credit-card'>
              <span className='credit-card__bankname'>Bank name</span>
              <div className='credit-card__card-logo' ref={creditCardRef} />
              <div className='credit-card__number'>
                <input
                  type='number'
                  maxLength={4}
                  className={errors.cc1 && 'invalid'}
                  {...register('cc1', {
                    minLength: 4,
                    required: true,
                    onChange: (e) => validateNumericField(e),
                  })}
                  aria-invalid={errors.cc1 ? 'true' : 'false'}
                />
                <input
                  type='number'
                  maxLength={4}
                  className={errors.cc2 && 'invalid'}
                  {...register('cc2', {
                    minLength: 4,
                    required: true,
                    onChange: (e) => validateNumericField(e),
                  })}
                  aria-invalid={errors.cc2 ? 'true' : 'false'}
                />
                <input
                  type='number'
                  maxLength={4}
                  className={errors.cc3 && 'invalid'}
                  {...register('cc3', {
                    minLength: 4,
                    required: true,
                    onChange: (e) => validateNumericField(e),
                  })}
                  aria-invalid={errors.cc3 ? 'true' : 'false'}
                />
                <input
                  type='number'
                  maxLength={4}
                  className={errors.cc4 && 'invalid'}
                  {...register('cc4', {
                    minLength: 4,
                    required: true,
                    onChange: (e) => validateNumericField(e),
                  })}
                  aria-invalid={errors.cc4 ? 'true' : 'false'}
                />
              </div>
              <div className='credit-card__more'>
                <div className='credit-card__valid'>
                  <span>valid thru</span>
                  <input
                    type='number'
                    maxLength={2}
                    max={12}
                    min={1}
                    className={errors.month && 'invalid'}
                    {...register('month', {
                      required: true,
                      onChange: (e) => validateNumericField(e),
                    })}
                    aria-invalid={errors.month ? 'true' : 'false'}
                  />
                  /
                  <input
                    type='number'
                    maxLength={2}
                    max={99}
                    min={22}
                    className={errors.year && 'invalid'}
                    {...register('year', {
                      required: true,
                      onChange: (e) => validateNumericField(e),
                    })}
                    aria-invalid={errors.year ? 'true' : 'false'}
                  />
                </div>
                <div className='credit-card__cvv'>
                  <span>CVV</span>
                  <input
                    type='number'
                    maxLength={3}
                    className={errors.ccv && 'invalid'}
                    {...register('ccv', {
                      minLength: 3,
                      required: true,
                      onChange: (e) => validateNumericField(e),
                    })}
                    aria-invalid={errors.ccv ? 'true' : 'false'}
                  />
                </div>
              </div>
            </div>

            <div className='personal-data'>
              <label htmlFor='name-input' className='name-label'>
                Name
                {errors.name?.type === 'required' && (
                  <p role='alert'>Name is required</p>
                )}
                {errors.name?.type === 'pattern' && (
                  <p role='alert'>
                    Must be 2 words with at least 3 letters each
                  </p>
                )}
                <input
                  type='text'
                  id='name-input'
                  placeholder='Enter first and last name'
                  {...register('name', {
                    required: true,
                    pattern: /^[A-Z]{1}[a-z]{3,} [A-Z]{1}[a-z]{3,}$/,
                  })}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
              </label>

              <label htmlFor='phoneNumber-input' className='phoneNumber-label'>
                phone number
                {errors.phoneNum?.type === 'required' && (
                  <p role='alert'>Phone number is required</p>
                )}
                {errors.phoneNum?.type === 'pattern' && (
                  <p role='alert'>Must be 8 digits and start with + </p>
                )}
                <input
                  type='phone'
                  id='phoneNumber-input'
                  placeholder='Enter phone number'
                  maxLength={9}
                  {...register('phoneNum', {
                    required: true,
                    pattern: /^\+([0-9]{8})$/,
                    onChange: (e) => validateNumericField(e),
                  })}
                  aria-invalid={errors.phoneNum ? 'true' : 'false'}
                />
              </label>
              <label htmlFor='email-input' className='email-label'>
                email address
                {errors.email?.type === 'required' && (
                  <p role='alert'>E-mail is required</p>
                )}
                {errors.email?.type === 'pattern' && (
                  <p role='alert'>Must be valid e-mail address </p>
                )}
                <input
                  type='email'
                  id='email-input'
                  placeholder='Enter e-mail'
                  {...register('email', {
                    required: true,
                    pattern: /^(.)+@(.)+\.(.){2,4}$/,
                  })}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
              </label>

              <label
                htmlFor='deliveryAdress-input'
                className='deliveryAdress-label'
              >
                delivery address
                {errors.delivery?.type === 'required' && (
                  <p role='alert'>Delivery address is required</p>
                )}
                {errors.delivery?.type === 'pattern' && (
                  <p role='alert'>Must be at least 3 words with 5 letters </p>
                )}
                <input
                  type='text'
                  id='deliveryAdress-input'
                  placeholder='Enter address'
                  {...register('delivery', {
                    required: true,
                    pattern: /.{5,} .{5,} .{5,}/i,
                  })}
                  aria-invalid={errors.delivery ? 'true' : 'false'}
                />
              </label>
              <div className='personal-data__control-btns'>
                <input
                  type='submit'
                  className='btn-confirm btn'
                  value='Confirm'
                />

                <button
                  type='button'
                  className='btn-reset btn'
                  onClick={resetAllFields}
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalPurchasePage;
