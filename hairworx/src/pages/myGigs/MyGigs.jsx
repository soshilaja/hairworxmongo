import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const MyGigs = () => {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        "loading"
      ) : error ? (
        "something went wrong!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>{currentUser.isSeller ? "Services" : "Orders"}</h1>
            <Link to="/add">
              <button>Add new service</button>
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {data.map((gig) => (
              <tr key={gig._id}>
                <td>
                  <Link to={`/gig/${gig._id}`} className="link">
                    <img src={gig.cover} alt="gig" />
                  </Link>
                </td>

                <td>
                  <Link to={`/gig/${gig._id}`} className="link">
                    {gig.title}
                  </Link>
                </td>
                <td>${gig.price}</td>
                <td>{gig.sales}</td>
                <td>
                  <img
                    className="delete"
                    src="https://cdn.iconscout.com/icon/free/png-512/free-delete-736-470378.png?f=avif&w=256"
                    alt="delete"
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyGigs;
