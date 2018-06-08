import { ANNCS_ADD, ANNCS_EDIT, ANNCS_DELETE} from '../actions/types';

export default function(state = {}, action) {

	switch(action.type) {
		case ANNCS_ADD:
			return {...state};
		case ANNCS_EDIT:
			return {...state};
		case ANNCS_DELETE:
			
	}

	return state;
}