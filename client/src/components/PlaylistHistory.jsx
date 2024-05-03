import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_PLAYLISTS } from '../utils/queries';
import { UPDATE_PLAYLIST, DELETE_PLAYLIST } from '../utils/mutations';
import { useLocation } from 'react-router-dom';

function PlaylistHistory() {
  const currentPage = useLocation().pathname
   const { loading, error, data } = useQuery(GET_USER_PLAYLISTS);
   const [editId, setEditId] = useState(null); // State to manage edit mode
   const [formData, setFormData] = useState({ title: '', description: '', iframeContent: '' });
 
   useEffect(() => {
     if (error) {
       console.error("Error loading playlists:", error);
     }
     if (data) {
       console.log("Playlists loaded:", data.getUserPlaylists);
     }
   }, [error, data]);
 
   const [deletePlaylist] = useMutation(DELETE_PLAYLIST, {
     refetchQueries: [{ query: GET_USER_PLAYLISTS }],
     onCompleted: () => alert('Playlist deleted successfully')
   });
 
   const [updatePlaylist] = useMutation(UPDATE_PLAYLIST, {
     refetchQueries: [{ query: GET_USER_PLAYLISTS }],
     onCompleted: () => {
       console.log('Playlist updated successfully');
       setEditId(null);
     }
   });
 
   const handleEdit = (playlist) => {
     setEditId(playlist.id);
     setFormData({
       title: playlist.title,
       description: playlist.description,
       iframeContent: playlist.iframeContent
     });
   };
 
   const handleDelete = (id) => {
     if (window.confirm('Are you sure you want to delete this playlist?')) {
       deletePlaylist({ variables: { id } });
     }
   };
 
   const handleSubmit = (e) => {
     e.preventDefault();
     console.log("Submitting updated playlist data:", formData);
     updatePlaylist({ variables: { id: editId, ...formData } });
   };
 
   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error loading playlists: {error.message}</p>;
 
   return (
     <div className="container">
      <div className="mt-5 justify-content-center">
        <div className="row">
       {data && data.getUserPlaylists.map(playlist => (
         <div key={playlist.id}>
           {editId === playlist.id ? (
             <form onSubmit={handleSubmit}>
               <input className="form-control mb-3" type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
               <textarea className="form-control mb-3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
               <textarea className="form-control mb-3" value={formData.iframeContent} onChange={(e) => setFormData({ ...formData, iframeContent: e.target.value })} />
               <button className="form-button col-5 col-lg-1 p-3 me-2" type="submit">Save</button>
               <button className="form-button col-5 col-lg-1 p-3" onClick={() => setEditId(null)}>Cancel</button>
               <hr className="line"/>
             </form>
           ) : (
             <>
               <h3>{playlist.title}</h3>
               <p>{playlist.description}</p>
               <div className="mb-3" dangerouslySetInnerHTML={{ __html: playlist.iframeContent }} />
               <button className="form-button col-5 col-lg-1 p-3 me-2" onClick={() => handleEdit(playlist)}>Edit</button>
               <button className="form-button col-5 col-lg-1 p-3" onClick={() => handleDelete(playlist.id)}>Delete</button>
               <hr className="line"/>
             </>
           )}
         </div>
       ))}
       </div>
       </div>
     </div>
   );
 }

 export default PlaylistHistory;