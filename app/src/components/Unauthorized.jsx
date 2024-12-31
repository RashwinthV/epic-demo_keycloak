import '../styles/Error.css';

function Unauthorized() {
  return (
    <div className='back'>
<div className="container">  
<h1 className="warning">⚠️ Unauthorized Access</h1>
<p>You do not have permission or you have not initialized the <b style={{color:'black'}}> keycloak server</b> to view this page.</p>
</div>
</div>
  )
}

export default Unauthorized;