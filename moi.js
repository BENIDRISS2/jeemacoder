// declaration de use state en le modifiant 
const { useState: mystate } = React;

function Tapp() {
    const [ number, setnumber]=mystate('');
    const [name, setname] = mystate('');
    const [firstName , setfirstName] = mystate('');
    const [mail , setmail ] = mystate('');
    //  Un état qui stocke toutes les soumissions sous forme de tableau d'objets. Chaque objet représente une soumission avec les champs numer, name, firstName, et mail.
    const [ submittedInfos, setSubmittedInfos] =mystate('');
    // Un booléen qui indique si l'utilisateur est en train de modifier une entrée existante.
    const [isEditing, setIsEditing] = mystate(false);
    // L'index de l'entrée actuellement en cours de modification dans le tableau 
    const [ editIndex, setEditIndex] = mystate(null);
    //  Gestion de la Soumission du Formulaire
    // cette function est appele quand on soumet le formulair
    const handleSubmit =(e)=>{
        e.preventDefault()
         // Validation des champs
         if (!name || !firstName || !mail || !number) {
            alert("Tous les champs sont requis.");
            return; // Empêche la soumission si un champ est vide
         }
        // Un objet qui contient les valeurs actuelles des champs du formulaire. Cet objet sera ajouté au tableau submittedInfos ou remplacera une entrée existante si l'utilisateur est en mode d'édition.
        const newInfo ={ number, name , firstName , mail};

        // Si en Mode Édition
        if(isEditing){
            // arcourt chaque élément du tableau submittedInfos. Si l'index de l'élément correspond à editIndex, cet élément est remplacé par newInfo.
            const updatedInfos =submittedInfos.map((info, index)=>
            index === editIndex ? newInfo : info);
            setSubmittedInfos(updatedInfos);
            setIsEditing(false);
            // Désactive le mode d'édition et réinitialise l'index de l'entrée modifiée.
            setEditIndex(null);
        } 
        // Si isEditing est faux, cela signifie que l'utilisateur ajoute une nouvelle entrée. On utilise setSubmittedInfos pour ajouter newInfo au tableau submittedInfos.
        else {
            setSubmittedInfos([...submittedInfos, newInfo]);
        }
        // Réinitialisation des champs : Après la soumission du formulaire (que ce soit pour ajouter ou modifier), les champs du formulaire sont réinitialisés à des valeurs vide
        setnumber('');
        setname('');
        setfirstName('');
        setmail('');
    }
    // 5. Gestion de la Modification d'une Entrée
    // handleEdit : Cette fonction est appelée lorsque l'utilisateur clique sur "Modifier" pour une entrée.
// infoToEdit : Récupère l'entrée spécifique à modifier à l'aide de son index dans le tableau submittedInfos.
// Chargement des valeurs : Les valeurs de l'entrée sont chargées dans les champs du formulaire.
// Activation du mode d'édition : setIsEditing(true) active le mode d'édition, et setEditIndex(index) enregistre l'index de l'entrée à modifie
    const handleEdit = (index) => {
        const infoToEdit = submittedInfos[index];
        setnumber(infoToEdit.numer);
        setname(infoToEdit.name);
        setfirstName(infoToEdit.firstName);
        setmail(infoToEdit.mail);
        setIsEditing(true);
        setEditIndex(index);
    };
    // gestion de la suppression
    const handleDelete = (index) => {
        const updatedInfos = submittedInfos.filter((_, i) => i !== index);
        setSubmittedInfos(updatedInfos);
    };
    // rendu
    return (
<div style={{ padding: '10px', borderRadius: '5px',width:"100%" }}>
    <form
        style={{ backgroundColor: 'orange', width:"75%",padding: '30px', borderRadius: '9px', marginLeft: "12%" ,shadow:'20'}}
        onSubmit={handleSubmit}
    >
        <div className="mb-3 d-sm-flex">
           <div>
           <div><label htmlFor="name">Nom:</label></div>
           <div> <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Enter your name..."
                className="form-control"
            /></div>
           </div>
           <div>
           <div><label htmlFor="firstName">Prénom:</label> </div>
             <div>    <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                placeholder="Enter your first name"
                className="form-control"
            /></div>
           </div>
        </div>

        <div>
        <div className="mb-3">
           <div> <label htmlFor="mail">Email:</label></div>
            <div><input
                type="email"
                id="mail"
                value={mail}
                onChange={(e) => setmail(e.target.value)}
                placeholder="Enter your email"
                className="form-control"
            /></div>
        </div>
        <div className="mb-3">
            <div><label htmlFor="numer">Numéro de Téléphone:</label></div>
            <div>
            <input
                type="tel"
                id="numer"
                value={number}
                onChange={(e) => setnumber(e.target.value)}
                placeholder="Enter your phone number"
                className="form-control"
            />
            </div>
        </div>
        </div>
        <button type="submit" className="btn btn-primary">{isEditing ? "Update" : "Submit"}</button>
    </form>

    {/* affichage */}
    <h2>Informations Soumises:</h2>
    <table className="table table-bordered" style={{width:"70%"}}>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Numéro de Téléphone</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {submittedInfos && submittedInfos.length > 0 && submittedInfos.map((info, index) => (
                <tr key={index}>
                    <td>{info.name}</td>
                    <td>{info.firstName}</td>
                    <td>{info.mail}</td>
                    <td>{info.number}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => handleEdit(index)}>Modifier</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(index)}>Supprimer</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

    );   
}

ReactDOM.render(<Tapp />, document.getElementById('Form'));
