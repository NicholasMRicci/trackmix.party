export type formMessage = { msg: string, type: "success" | "warning" } | null

export function MakeForm(fields: { name: string, prop: string }[], getter: any, setter: any, submitHander: (event: any) => void, message: formMessage) {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <form className="col-11 col-sm-8 col-md-6">
                        {fields.map((field) => {
                            return (<div className="m-2 form-group">
                                <label htmlFor={field.name}>{field.name}</label>
                                <input type={field.prop === "password" ? "password" : "text"} className="form-control" id={field.name} placeholder={field.name} value={getter[field.prop]} onChange={(e) => { setter({ ...getter, [field.prop]: e.target.value }) }} />
                            </div>)
                        })}
                        <button onClick={submitHander} type="submit" className="btn btn-primary m-2">Submit</button>
                    </form>

                    <div className="row justify-content-center">
                        {message && <div className={"alert col-11 col-sm-8 col-md-6 " + message.type === "success" ? "alert-sucess" : "alert-danger"}>{message.msg}</div>}
                    </div>
                </div >
            </div>

        </>
    )
}