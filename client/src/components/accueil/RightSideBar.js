import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from'../../images/logo.png'
import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";

import { getSuggestions } from "../../redux/actions/suggestionsAction";

const RightSideBar = () => {
  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="sticky">
      <UserCard user={auth.user} />

      <div className="my-2 text-center d-flex justify-content-between align-items-center">
        <p className="text-danger mb-0 fs-6">Quelques suggestion pour vous</p>
        {!suggestions.loading && (
          <i
            className="fas fa-redo"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(getSuggestions(auth.token))}
          />
        )}
      </div>

      {suggestions.loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="suggestions">
          {suggestions.users.map((user) => (
            <UserCard key={user._id} user={user}>
              <FollowBtn user={user} />
            </UserCard>
          ))}
        </div>
      )}

      <div style={{ opacity: 0.5 }} className="my-2 text-center" >
        <a href="https://www.horebmastertech.com" target="_blank" rel="noreferrer"
          style={{ wordBreak: 'break-all' }} >
          Horeb Groupe
        </a>
        <small className="d-block">
          Bienvenue sur notre site de chat
        </small>

        <small>
          &copy; 2022 HorebMastertech
        </small>
        <h1 className="text-center mt-3 p-0 m-0 d-flex justify-content-center align-items-center"
          onClick={() => window.scrollTo({ top: 0 })}>
          <img src={Logo} alt="logo" style={{ width: '60px' }} />
          <span style={{ color: '#122556', fontSize: '35px' }}>Horeb Chat</span>
        </h1>
      </div>

    </div>
  );
};

export default RightSideBar;
