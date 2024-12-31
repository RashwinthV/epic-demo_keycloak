import '../styles/Error.css';

function Unauthorized() {
  return (
    <div>
<div class="container">  
<h1 class="warning">⚠️ Unauthorized Access</h1>
<p>You do not have permission or you have not initialized the <b style={{color:'black'}}> keycloak server</b> to view this page.</p>
</div>
</div>
  )
}

export default Unauthorized;