import React, { useState, useCallback } from "react";
import { gql, useMutation } from "@apollo/client";

const LOG_IN = gql`
  mutation Login($username: String!) {
    user {
      id
      firstName
      lastName
    }
  }
`;

const MSWGraphQLForm = () => {
  const [username, setUsername] = useState("");

  const [logIn, { data, loading, error }] = useMutation(LOG_IN, {
    variables: {
      username,
    },
  });

  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const handleFormSubmit = useCallback(
    (event) => {
      event.preventDefault();

      logIn({
        variables: username,
      });
    },
    [username, logIn]
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error while fetching the user data ({error.message})</p>;
  }

  if (data) {
    return (
      <div>
        <h1>
          <span data-testid="firstName">{data.user.firstName}</span>{" "}
          <span data-testid="lastName">{data.user.lastName}</span>
        </h1>
        <p data-testid="userId">{data.user.id}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default MSWGraphQLForm;
