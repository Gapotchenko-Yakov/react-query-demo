import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchUserByEmail = ({ queryKey }) => {
  const email = queryKey[1];
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchChannelById = ({ queryKey }) => {
  const id = queryKey[1];
  return axios.get(`http://localhost:4000/channels/${id}`);
};

const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(["users", email], fetchUserByEmail);

  const channelId = user?.data.channelId;

  const { data: { data: channel } = {} } = useQuery(
    ["channels", channelId],
    fetchChannelById,
    {
      enabled: !!channelId,
    }
  );

  return (
    <div>
      <h2>{channel?.id}</h2>
      <ul>
        {channel?.courses?.map((course) => (
          <li key={course}>{course}</li>
        ))}
      </ul>
    </div>
  );
};

export default DependentQueriesPage;
