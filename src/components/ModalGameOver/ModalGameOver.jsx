import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import style from './ModalGameOver.module.css'
import { useState } from 'react';
import useConnect from '../../hooks/useConnect';
import TableRank from '../TableRank';
import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalGameOver({ currentModal, open, setOpen, status, setOpenDesktop, }) {
    const { t } = useTranslation();
    const [saveScore, setSaveScore] = useState(status ? "Rank" : "options");
    const [email, setEmail] = useState("");
    const { loading, addDocument } = useConnect('Data');


    const handleAddDocument = (e) => {
        e.preventDefault()
        const data = {
            score: currentModal,
            email: email
        }
        addDocument(data);
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                {saveScore !== "Rank" ?
                    <DialogTitle>{`${t("Your Score")}: ${currentModal}`}</DialogTitle> :
                    <DialogTitle>{`${t("Rank")}`}</DialogTitle>
                }
                <DialogContent className={style.DialogContent}>
                    {saveScore === "options" &&
                        <>
                            <Button
                                className={style.Button}
                                variant="contained"
                                onClick={() => setOpen(false)}
                            >
                                {t("Play again")}
                            </Button>

                            <Button
                                className={style.Button}
                                variant="contained"
                            // onClick={}
                            >
                                {t("To share")}
                            </Button>

                            <Button
                                className={style.Button}
                                variant="contained"
                                onClick={() => setSaveScore("save")}
                            >
                                {t("Save Score")}
                            </Button>

                        </>
                    }

                    {saveScore === "save" &&
                        <>
                            <form onSubmit={handleAddDocument}>
                                <TextField
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    margin="dense"
                                    id="name"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                />

                                {!loading && <Button
                                    type='submit'
                                    className={style.Button}
                                    variant="contained"
                                >
                                    {t("Save")}
                                </Button>}

                                {loading && <Button
                                    disabled
                                    type='submit'
                                    variant="contained"
                                >
                                    {t("Wait")}...
                                </Button>}

                                <Button
                                    type='button'
                                    onClick={() => setSaveScore("options")}
                                >
                                    {t("Back")}
                                </Button>

                            </form>
                        </>
                    }
                    {saveScore === 'Rank' &&
                        <div className={style.divRank}>
                            <TableRank />
                            <Button
                                type='button'
                                onClick={() => setOpenDesktop(false)}
                            >
                                {t("Back")}
                            </Button>

                        </div>
                    }

                </DialogContent>
            </Dialog>
        </React.Fragment >
    );
}
