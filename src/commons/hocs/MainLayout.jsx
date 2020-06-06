/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import _ from "lodash";

// matterials
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import LocalMallIcon from "@material-ui/icons/LocalMall";
// Socials
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

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
import imgPayment from "../assets/img/icon/payment.png";

const useStyles = makeStyles(() => ({
  logoImage: {}
}));

export default function MainLayout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoginForm = useSelector(state => state[MODULE_UI].isLoginForm);
  const errorMessage = useSelector(state => state[MODULE_UI].errorMessage);
  const successMessage = useSelector(state => state[MODULE_UI].successMessage);
  const account = useSelector(state => state[MODULE_USER].account);
  const toggleMenuMobile = useSelector(state => state[MODULE_UI].toggleMenuMobile);

  // const isMaxWidth500PX = useMediaQuery("(max-width: 500px");
  const { enqueueSnackbar } = useSnackbar();

  // states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null); // for user icon

  // handlers
  const handleAgree = () => {
    dispatch(actionsSagaUI.logout());
    setIsDialogOpen(false);
  };

  const handleDisagree = () => {
    setIsDialogOpen(false);
  };

  const handleAccountClick = event => {
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
              <a key={item.name} onClick={() => history.push(item.path)}>
                {item.name}
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
          <img className={classes.logoImage} src={autogoLogo} alt="logo" />
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
          <a onClick={handleAccountClick}>
            <PersonIcon />
          </a>

          {account ? (
            <Menu
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleAccountMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleClickProfile}>Trang cá nhân</MenuItem>
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
          ) : (
            <Menu
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleAccountMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleToggleLoginForm}>Đăng nhập</MenuItem>
              <MenuItem onClick={handleToggleLoginForm}>Đăng ký</MenuItem>
            </Menu>
          )}

          {/* Mobile Menu */}
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
          <img src="img/logo.png" alt="abc" />
          <h3>
            About <span>AutoGo</span>
          </h3>

          <p className="footer-links">
            <a href="#">Home</a>|<a href="#">Blog</a>|<a href="#">About</a>|<a href="#">Contact</a>
          </p>

          <p className="footer-company-name">© 2020 AutoGo -K17- SGU.</p>
        </div>

        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker" />
            <p>
              <span>Sai Gon University</span>
              273 An Dương Vương, Phường 3, Quận 5, Hồ Chí Minh - 700000
            </p>
          </div>

          <div>
            <i className="fa fa-phone" />
            <p>+84 09-87654321</p>
          </div>
          <div>
            <i className="fa fa-envelope" />
            <p>
              <a href="mailto:support@autogo.com">support@autogo.com</a>
            </p>
          </div>
        </div>
        <div className="footer-right">
          <p className="footer-company-about">
            <span>About the company</span>
            We offer training and skill building courses across Technology, Design, Management,
            Science and Humanities.
          </p>
          <div className="footer-icons">
            <a href="#">
              <FacebookIcon />
            </a>
            <a href="#">
              <TwitterIcon />
            </a>
            <a href="#">
              <InstagramIcon />
            </a>
            <a href="#">
              <LinkedInIcon />
            </a>
            <a href="#">
              <YouTubeIcon />
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
        dialogTitle="Chuẩn bị đăng xuất"
        dialogContent="Bạn có chắc muốn Đăng xuất?"
        agreeText="Đăng xuất"
        disagreeText="Huỷ"
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
