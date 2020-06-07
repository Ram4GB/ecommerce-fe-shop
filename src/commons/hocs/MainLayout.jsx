/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import _ from "lodash";
import { useTranslation } from "react-i18next";

// Matterials
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";

// matterial-icons
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import LanguageIcon from "@material-ui/icons/Language";

// saga
import { MODULE_NAME as MODULE_UI } from "../../modules/ui/models";
import { MODULE_NAME as MODULE_USER } from "../../modules/user/models";
import * as actionsUIReducer from "../../modules/ui/reducers";
import * as actionsSagaUI from "../../modules/ui/actionsSaga";

// components
import LoginForm from "../../modules/ui/components/LoginForm";
import ModalCustom from "../components/ModalCustom";
import MobileMenu from "../components/MobileMenu";
import DialogCustom from "../components/DialogCustom";

// helpers
import { errorIgnore } from "../errorArray";
import { navbars } from "../navbars";

// asset image
import autogoLogo from "../assets/img/logos/Autogo_Logo_Icon_nocolor.svg";
// import imgPayment from "../assets/img/icon/payment.png";

export default function MainLayout({ children }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const isLoginForm = useSelector(state => state[MODULE_UI].isLoginForm);
  const errorMessage = useSelector(state => state[MODULE_UI].errorMessage);
  const successMessage = useSelector(state => state[MODULE_UI].successMessage);
  const account = useSelector(state => state[MODULE_USER].account);
  const toggleMenuMobile = useSelector(state => state[MODULE_UI].toggleMenuMobile);

  // const isMaxWidth500PX = useMediaQuery("(max-width: 500px");
  const { enqueueSnackbar } = useSnackbar();

  // states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // for user icon
  const [isLangSelectorOpen, setIsLangSelectorOpen] = useState(false);

  // helpers
  const trans = key => t(`${MODULE_UI}.${key}`);

  // handlers
  const handleAgree = () => {
    dispatch(actionsSagaUI.logout());
    setIsDialogOpen(false);
  };

  const handleDisagree = () => {
    setIsDialogOpen(false);
  };

  const handleClickAccount = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToggleLoginForm = () => {
    if (isLoginForm) dispatch(actionsUIReducer.SET_IS_LOGIN_FORM(false));
    else dispatch(actionsUIReducer.SET_IS_LOGIN_FORM(true));

    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsDialogOpen(true);
    setAnchorEl(null);
  };

  const handleClickProfile = () => {
    setAnchorEl(null);
    history.push("/user/profile");
  };

  const handleClickLang = event => {
    setIsLangSelectorOpen(event.currentTarget);
  };

  const handleLangMenuClose = () => {
    setIsLangSelectorOpen(null);
  };

  const setLang = lang => {
    dispatch(actionsUIReducer.SET_LANG(lang));
    i18n
      .changeLanguage(lang)
      .then(() => {
        // console.log(data);
      })
      .catch(() => {
        // console.log(err);
      });

    setIsLangSelectorOpen(null);
  };

  // cheating
  document.body.style.overflow = toggleMenuMobile ? "hidden" : "auto";

  // useEffects
  useEffect(() => {
    // if errorMessage is a object do not have key errors
    if (
      errorMessage &&
      !errorMessage.errors &&
      !_.includes(errorIgnore, errorMessage.name ? errorMessage.name : "")
    ) {
      enqueueSnackbar(errorMessage.message ? errorMessage.message : "Frontpage Error", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
        autoHideDuration: 1000
      });
      setTimeout(() => {
        dispatch(actionsUIReducer.SET_ERROR_MESSAGE(""));
      }, 100);
    } else if (errorMessage && errorMessage.errors) {
      // if errorMessage is a object has key errors
      errorMessage.errors.forEach(error => {
        enqueueSnackbar(error.msg ? error.msg : "Frontpage Error", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 1000
        });
      });
      setTimeout(() => {
        dispatch(actionsUIReducer.SET_ERROR_MESSAGE(""));
      }, 100);
    }
  }, [errorMessage, enqueueSnackbar, dispatch]);

  useEffect(() => {
    if (successMessage) {
      enqueueSnackbar(successMessage.message ? successMessage.message : "Frontpage Error", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
        autoHideDuration: 1000
      });
      setTimeout(() => {
        dispatch(actionsUIReducer.SET_SUCCESS_MESSAGE(""));
      }, 100);
    }
  }, [successMessage, enqueueSnackbar, dispatch]);

  // renderers
  const renderNavBarDesktop = () => {
    return (
      <>
        <div className="topnav-centered">
          <div>
            {navbars.map(item => (
              <a key={item.key} onClick={() => history.push(item.path)}>
                {trans(`nav.${item.key}`)}
              </a>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderHeader = () => (
    <div className="header">
      <div className="topnav flex-center-center">
        <a className="logo-wrapper" onClick={() => history.push("/")}>
          <img src={autogoLogo} alt="logo" />
        </a>

        {renderNavBarDesktop()}

        <div className="topnav-right flex-center-center">
          {/* Cart */}
          <a onClick={() => history.push("/cart_view")}>
            <Badge
              badgeContent={4}
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
            >
              <LocalMallIcon />
            </Badge>
          </a>

          {/* Account */}
          <a onClick={handleClickAccount}>
            <PersonIcon />
          </a>

          {account ? (
            <Menu
              disableScrollLock
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleAccountMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleClickProfile}>{trans("nav.profile")}</MenuItem>
              <MenuItem onClick={handleLogout}>{trans("nav.logout")}</MenuItem>
            </Menu>
          ) : (
            <Menu
              disableScrollLock
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleAccountMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem name="login" onClick={handleToggleLoginForm}>
                {trans("nav.login")}
              </MenuItem>
              <MenuItem name="signup" onClick={handleToggleLoginForm}>
                {trans("nav.signup")}
              </MenuItem>
            </Menu>
          )}

          {/* Lang */}
          <a onClick={handleClickLang}>
            <LanguageIcon />
          </a>

          <Menu
            disableScrollLock
            anchorEl={isLangSelectorOpen}
            getContentAnchorEl={null}
            keepMounted
            open={Boolean(isLangSelectorOpen)}
            onClose={handleLangMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem name="vi" onClick={() => setLang("vi")}>
              Tiếng Việt
            </MenuItem>
            <MenuItem name="en" onClick={() => setLang("en")}>
              English
            </MenuItem>
          </Menu>

          {/* Mobile Menu Icon */}
          <a
            onClick={() => dispatch(actionsUIReducer.TOGGLE_MENU_MOBILE(!toggleMenuMobile))}
            className="toggle-mobile-menu"
          >
            {toggleMenuMobile ? <CloseIcon /> : <MenuIcon />}
          </a>
        </div>
      </div>
      {/* MobileMenu and overlay */}
      <MobileMenu toggleMenuMobile={toggleMenuMobile} menus={navbars} />
      <div
        className="overlay-bg"
        onClick={() => dispatch(actionsUIReducer.TOGGLE_MENU_MOBILE(!toggleMenuMobile))}
      />
    </div>
  );

  const renderFooter = () => (
    <>
      <footer className="footer-distributed">
        <div className="footer-left">
          <h3>
            Company<span>AutoGo</span>
          </h3>

          <p className="footer-links">
            {navbars.map((item, index) => (
              <a key={item.key} href={`${item.path}`}>
                {trans(`nav.${item.key}`) + (index === navbars.length - 1 ? "" : " - ")}
              </a>
            ))}
          </p>

          <p className="footer-company-name">Company AutoGo © 2020</p>
        </div>

        <div className="footer-center">
          <div>
            <i className="fas fa-map-marker-alt" />
            <p>
              <span>123 abc An Duong Vuong</span> Ho Chi Minh city, Viet Nam
            </p>
          </div>

          <div>
            <i className="fas fa-phone-alt" />
            <p>+1 234 567890</p>
          </div>

          <div>
            <i className="fas fa-envelope" />
            <p>
              <a href="mailto:support@company.com">support@company.com</a>
            </p>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            <span>About the company</span>
            Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit,
            eu auctor lacus vehicula sit amet.
          </p>

          <div className="footer-icons">
            <a href="#">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#">
              <i className="fab fa-twitter" />
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in" />
            </a>
            <a href="#">
              <i className="fab fa-github" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );

  const renderModals = () => (
    <>
      <ModalCustom
        className="modal-login"
        onClose={() => dispatch(actionsUIReducer.SET_IS_LOGIN_FORM(false))}
        open={isLoginForm}
      >
        <LoginForm />
      </ModalCustom>
      <DialogCustom
        dialogTitle={trans("dialog.logout.title")}
        dialogContent={trans("dialog.logout.content")}
        agreeText={trans("dialog.logout.agree")}
        disagreeText={trans("dialog.logout.disagree")}
        handleDisagree={handleDisagree}
        handleAgree={handleAgree}
        open={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
      />
    </>
  );

  return (
    <>
      {renderHeader()}
      <div className="container">{children}</div>
      {renderFooter()}
      {renderModals()}
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

MainLayout.defaultPropTypes = {
  children: null
};
