import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { style } from '../../../../untils/styleContants';
import { addDocument, updateDocument } from '../../../../services/FirebaseService';
import { Autocomplete, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useContext } from 'react';
import { ContextPlans } from '../../../../contexts/PlanProvider';
import { getOjectById } from '../../../../services/reponsitory';
import { useRadioGroup } from '@mui/material/RadioGroup';
import { styled } from '@mui/system';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme }) => ({
        variants: [
            {
                props: { checked: true },
                style: {
                    '.MuiFormControlLabel-label': {
                        color: theme.palette.primary,
                    },
                },
            },
        ],
    }),
);
function ModalFeature({ open, handleClose, feature, setFeature, error, setError, inner, handleUpdate }) {
    const plans = useContext(ContextPlans);

    function MyFormControlLabel(props) {
        const radioGroup = useRadioGroup();

        let checked = false;

        if (radioGroup) {
            checked = radioGroup.value === props.value;
        }

        return <StyledFormControlLabel checked={checked} {...props} />;
    }

    const validation = () => {
        const newError = {
            plan: feature.plan ? "" : "Please enter plan",
            text: feature.text ? "" : "Please enter text",
            available: feature.available ? "" : "Please enter available",
        };
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };

    const handleChange = (e) => {
        setFeature(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addTask = async () => {
        if (!validation()) {
            return
        }
        if (feature.id) {
            await updateDocument("Features", feature);
        } else {
            await addDocument("Features", feature);
        }
        handleClose();
        setFeature(inner);
        handleUpdate();
    }
    const Cancel = () => {
        handleClose();
        setFeature(inner);
        setError(inner);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6">Modal Add Features</Typography>

                <Autocomplete
                    options={plans}
                    getOptionLabel={(option) => option.title}
                    disablePortal
                    fullWidth
                    sx={{ mt: 2 }}
                    value={getOjectById(plans, feature.plan)}
                    onChange={(event, value) =>
                        setFeature(prev => ({ ...prev, plan: value?.id || "" }))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Find the plan"
                            error={!!error.plan}
                            helperText={error.plan}
                        />
                    )}
                />

                <TextField
                    value={feature.text || ""}
                    onChange={handleChange}
                    name='text'
                    label="text"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mt: 2 }}
                    error={!!error.text}
                    helperText={error.text}
                />
                <RadioGroup name="available" onChange={handleChange} defaultValue="yes" >
                    <MyFormControlLabel  value="yes" label="Yes" control={<Radio />} />
                    <MyFormControlLabel value="no" label="No" control={<Radio />} />
                </RadioGroup>

                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: "end" }}>
                    <Button onClick={addTask} variant="contained">
                        {feature?.id ? "Edit" : "Add"}
                    </Button>
                    <Button onClick={Cancel} variant="contained" color="error">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalFeature;