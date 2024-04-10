import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

export type formMessage = { msg: string, type: "success" | "warning" } | false;

export function FormContainer(props: { children: any }) {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <form className="col-11 col-sm-9 col-md-6">
                    {props.children}
                </form>
            </div>
        </div>
    )

}

export function MakeForm(fields: { name: string, prop: string }[], getter: any, setter: any, submitHander: (event: any) => void, message: formMessage) {
    return (
        <>
            <FormContainer>
                {
                    fields.map((field) => {
                        return (
                            <div className="m-2 form-group" key={field.name}>
                                <label htmlFor={field.name}>{field.name}</label>
                                <input type={field.prop === "password" ? "password" : "text"} className="form-control" id={field.name} placeholder={field.name} value={getter[field.prop]} onChange={(e) => { setter({ ...getter, [field.prop]: e.target.value }) }} />
                            </div>
                        )
                    })
                }
                <button onClick={submitHander} type="submit" className="btn btn-primary m-2">Submit</button>

                <div className="row justify-content-center">
                    {message && <div className={"alert " + (message.type === "success" ? "alert-success" : "alert-danger")}>{message.msg}</div>}
                </div>
            </FormContainer>
        </>
    )
}