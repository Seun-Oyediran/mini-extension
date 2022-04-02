import Airtable from 'airtable';
import { getFilterString } from '../../utils';
import {
  LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_USER, START_LOGIN, STOP_LOGIN,
} from '../namespaces';

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(
  'app8ZbcPx7dkpOnP0',
);

const fetchAirtableData = (fieldbase: string, filterByFormula = '') => {
  return base(fieldbase)
    .select({
      view: 'Grid view',
      filterByFormula,
    })
    .all();
};

export const loginStudent = (name: string) => async (dispatch: any) => {
  dispatch({ type: START_LOGIN, payload: name });
  const finalData: any = [];
  try {
    // 1st API CALL. get login data for student
    const loginData = await fetchAirtableData('Students', `({Name}="${name}")`);

    if (!loginData || loginData.length === 0) throw new Error('No student was found');

    const { Classes }: { Classes: Array<string> } = loginData[0].fields as any;
    const classFilterString = getFilterString(Classes);

    // 2nd API CALL.  get all classes the students is in
    const classData = await fetchAirtableData('Classes', classFilterString);

    await Promise.all(
      classData.map(async (item, index) => {
        const { Students, Name }: { Students: Array<string>; Name: string } = item.fields as any;
        const studentsFilterString = getFilterString(Students);

        // 3rd API CALL get students in each classes
        const studentsData = await fetchAirtableData('Students', studentsFilterString);
        const studentNameArray = studentsData.map((student) => student.fields?.Name);

        finalData[index] = { id: item.id, class: Name, students: studentNameArray };
      }),
    );

    dispatch({ type: LOGIN_SUCCESS, payload: finalData });
  } catch (error: any) {
    dispatch({ type: LOGIN_FAILED, payload: error?.message });
  } finally {
    dispatch({ type: STOP_LOGIN });
  }
};

export const logoutStudent = () => (dispatch: any) => {
  dispatch({ type: LOGOUT_USER });
};
