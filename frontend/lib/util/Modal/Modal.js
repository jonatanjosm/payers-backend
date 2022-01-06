import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { COLOR_AZUL_OSCURO, COLOR_GRIS, COLOR_ROJO } from '../Colors';

class Modal extends Component {

  componentDidMount() {

    if (this.props.isOpen) {
      if (window && window.document) {
        let body = window.document.getElementsByTagName('html');
        if (body && body.length > 0) {
          body[0].style.overflow = 'hidden';
        }
      }
    }
  }

  componentWillUnmount() {
    if (window && window.document) {
      let body = window.document.getElementsByTagName('html');
      if (body && body.length > 0) {
        body[0].style.overflowX = 'auto';
        body[0].style.overflowY = 'auto';
      }
    }
  }

  renderModal = () => {
    const {
      className,
      onClose,
      children,
      action,
      actionCommand,
      actionLoading,
      noBorders,
    } = this.props;

    return (
      <>
        <div className={'m-backdrop justify-content-center'}>
          <div className={'m-container2'}>
            <div className='modal-padding bg-white'>
              <div className='close-button-container'>
                <button
                  className='close-button'
                  role='button'
                  tabIndex={0}
                  onClick={onClose}>
                  <i className='fas fa-times close-button-times' />
                </button>
              </div>

              <div className={'m-container1'}>
                <div className='m-content'>
                  {children}
                </div>

                {
                  action &&
                  <div className='action-container'>
                    <button
                      className='m-button outline-none'
                      onClick={actionCommand}
                      disabled={actionLoading}
                    >
                      {action}
                      {
                        actionLoading &&
                        <i className='fa fa-spinner fa-spin ml-1'></i>
                      }
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .m-backdrop {
            display: flex;
            z-index: 1000;
            position: fixed;
            top: 0;
            left: 0;
            bottom:0;
            right:0;
            background: rgba(0, 0, 0, 0.5);
            overflow-y:auto;
            overflow-x:hidden;
          }

          .m-container {
            display: block;
            z-index: 10;
            position: sticky;
            top:2rem;
            width: 85vw;
            border-radius: 20px;
          }

          .m-video-container {
            width: auto !important;
            display: flex
          }

          .modal-padding{
            padding: 25px 50px;
            border-radius:10px;
          }

          .m-container2{
            position: sticky;
            padding:0;
            margin-top:10%;
            width: 50%;
          }


          .m-button:disabled,
          .m-button[disabled]{
            background-color: #a07cd4;
            border-color: #a07cd4;
            color: #f0f0f0;
          }

          .close-button {
            border:0;
            top:-20px;
            right:-20px;
            position: absolute;
            cursor: pointer;
            background: ${COLOR_ROJO};
            border-radius: 50%;
            width: 40px;
            height: 40px;
          }

          .close-button-times {
            color: white;
            font-size:20px;
          }

          .m-button {
            color:#fff;
            background-color: ${COLOR_AZUL_OSCURO};
            border-color: ${COLOR_GRIS};
            cursor: pointer;
            border: 1px solid transparent;
            position: absolute;
            padding: .375rem .75rem;
            padding: 13px 29px;
            border-radius: 7px;
            bottom: -27px;
            font-family: Gilroy-Bold;
            display: flex;
            align-items: center;
          }

          .outline-none{
            outline: none;
          }

          .action-container {
            display: flex;
            justify-content: center;
          }

          @media (min-width:769px) {
            .m-container {
              margin:0 auto;
              width:640px!important;
            }

            .m-video-container {
              width: auto !important;
              display: flex
            }
          }

          @media screen and (max-width: 480px) {
            .m-backdrop {
              background-color: #fff;
            }

            .m-container2 {
              padding: 0;
            }

            .m-container {
              width: 100vw;
              border-radius: 0;
            }

            .modal-padding {
              padding: .5em 1em;
            }

            .close-button-container {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              padding: 1em 0;
            }

            .close-button {
              position: initial;
              height: 30px;
              width: 30px;
            }


            .action-container {
              padding: 2.2em 0;
            }

            .m-button {
              position: initial;
            }
          }
        `}</style>
      </>
    )
  };

  render() {
    const modal = this.props.isOpen ? this.renderModal() : null;

    if (process.browser) {
      return ReactDOM.createPortal(
        modal,
        document.getElementById('__next'),
      );
    } else {
      return null;
    }
  }
}


Modal.defaultProps = {
  isOpen: false,
  actionLoading: false,
  className: '',
};

export default Modal;