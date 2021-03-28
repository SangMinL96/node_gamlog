const mybatisMapper = require('mybatis-mapper');
const poolMaria = require('../config/mariadb');
const fs = require('fs');

const files = fs.readdirSync(__dirname).filter((file) => file.includes('.xml'));

const paths = [];
files.forEach((file) => paths.push(__dirname + '/' + file));

mybatisMapper.createMapper(paths);
/**
 * 쿼리 실행하기
 * @param {string} fileName sql 파일명/namespace
 * @param {string} sqlId id
 * @param {object} param SQL문 ${}, #{} 대상
 * @returns {arry|boolean} SQL문 실행 결과 또는 Exception시 false
 */
module.exports.query = async (fileName, sqlId, param, option = { language: 'sql', indent: '  ' }) => {
  const connection = await poolMaria.getConnection();
  try {
    let sql = mybatisMapper.getStatement(fileName, sqlId, param, option);
    const retList = await connection.query(sql);
    return retList;
  } catch (err) {
    console.log(err);
    return false;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
