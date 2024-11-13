const { Sequelize, Op } = require("sequelize");
const Students = require("../model/student");

const getAll = async () => {
try {
    return await Students.findAll({
    where: {
        deleted: 0,
    },
    attributes: {
        exclude: "deleted",
    },
    });
} catch (err) {
    console.error(`Error in studentsRepository: ${err}`);
    throw err;
}
};

const getById = async (id) => {
try {
    return await Students.findByPk(id, {
    where: {
        deleted: 0,
    },
    attributes: {
        exclude: "deleted",
    },
    });
} catch (err) {
    console.error(`Error in studentsRepository: ${err}`);
    throw err;
}
};
//create new student
const createNewStudent = async (student) => {
    try {
      const existsStudent = await Students.findOne({
        where: {
          [Sequelize.Op.or]: [{ email: student.email }, { dni: student.dni }],
        },
        deleted: 0
      });
  
      if (existsStudent) {
        throw new Error(`Ya existe un estudiante con ese email o dni`);
      }
  
      const lastStudent = await Students.findOne({
        where: { deleted: { [Op.or]: [0, 1] } }, 
        order: [["sid", "DESC"]], 
      });
      //si encontro
      console.log('vlaor: ', lastStudent.sid)
      if(lastStudent){
        const newSid = lastStudent ? lastStudent.sid + 1 : 1;
        student = {
          ...student,
          sid: newSid,
          createdAt: new Date(),
        };
        const newStudent = await Students.create(student);
        return newStudent;
      }else{
        const deletedStudent = await Students.findOne({
          where: { deleted: 1 },
          order: [["sid", "DESC"]],
        });
        if(deletedStudent){
          deletedStudent.deleted = 0;
          return deletedStudent;
        }else{
          console.log('La base de datos esta vacia procedemos a crear el primer elemento');
          const newSid = 1;
          student = {
            ...student,
            sid: newSid,
            createdAt: new Date(),
          };
          const newStudent = await Students.create(student);
          return newStudent;
        }
      
      }     
    } catch (err) {
      console.error(`Error in studentsRepository: ${err}`);
      throw err;
    }
  }; //end create

const deleteBySid = async (sid) => {
  try {
    return await Students.update(
      { deleted: 1 },
      {
        where: { sid: sid },
      }
    );
  } catch (err) {
    console.error(`Error in studentsRepository: ${err}`);
    throw err;
  }
};

const getStudentsPagination = async (search, currentPage, pageSize) => {
  try {
    const offset = (currentPage - 1) * pageSize;
    return await Students.findAndCountAll({
      where: {
        lastName: {
          [Op.startsWith]: search,
        },
        deleted: 0,
      },
      limit: pageSize,
      offset,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};


module.exports = {
  getAll,
  getById,
  createNewStudent,
  deleteBySid,
  getStudentsPagination,
};
