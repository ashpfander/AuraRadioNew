import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';


function PlaylistHistory() {
 const currentPage = useLocation().pathname


 return (
   <header className="ps-4">
     <nav className="navbar navbar-expand-lg navbar-dark">
       <div className="container-fluid d-flex align-items-center">
         <a href="/" className="playlistHistory-link"><header3>Your Playlist History</header3></a>
       </div>
       <div>
       <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
       <p>

       Donec a volutpat quam. Curabitur nec varius justo, sed rutrum ligula.
       Curabitur pellentesque turpis sit amet eros iaculis, a mollis arcu
       dictum. Ut vel ante eget massa ornare placerat. Etiam nisl orci, finibus
       sodales volutpat et, hendrerit ut dolor. Suspendisse porta dictum nunc,
       sed pretium risus rutrum eget. Nam consequat, ligula in faucibus
       vestibulum, nisi justo laoreet risus, luctus luctus mi lacus sit amet
       libero. Class aptent taciti sociosqu ad litora torquent per conubia
       nostra, per inceptos himenaeos. Mauris pretium condimentum tellus eget
       lobortis. Interdum et malesuada fames ac ante ipsum primis in faucibus.
       Donec placerat accumsan mi, ut congue neque placerat eu. Donec nec ipsum
       in velit pellentesque vehicula sit amet at augue. Maecenas aliquam
       bibendum congue. Pellentesque semper, lectus non ullamcorper iaculis,
       est ligula suscipit velit, sed bibendum turpis dui in sapien.

       </p>
   <button onclick="clickCount()" type="button" id="history_button">History</button>
   <div id="history"></div>
       </div>
     </nav>
   </header>
 );
}


  export default PlaylistHistory;