import React from "react";

const text_bank = [
"Lorem ipsum dolor sit amet, et mel dolorum probatus. Natum oblique luptatum duo ut, possit impedit voluptaria in sit. Ut his dicta mucius feugait, ius aperiam offendit mediocritatem cu. Sea errem prodesset eu, an pri vivendo eloquentiam. Ut mel conceptam dissentias. Atqui veniam his et, prompta bonorum detracto ea sit. Duo eros graece fabulas ut, accusam definitionem interpretaris id ius. No sea tale verear, est an purto decore. Ea porro dolor sed, vis vocent utroque id, vim ex affert equidem consetetur.  Brute harum dictas te eos, at duo inani homero vivendum, ei dico perfecto consectetuer vim. Id nec zril expetenda, eos erat libris sententiae id. Legendos consequuntur te duo, sed id libris eligendi suscipiantur. Eum stet populo complectitur ne, has malorum euismod deleniti ei. Eu amet fabulas oportere sea. In elit invidunt definitiones sed. Natum facilis ex eum, ignota ceteros scriptorem ex duo. Cu pro exerci nemore aliquam. Cu quis splendide ullamcorper sit, eam dolorem fierent ea, ei possit placerat fabellas sed. Et graece malorum pri. Salutatus hendrerit ne sit. Aeterno pertinax dissentiunt cu pro. Ius exerci maluisset patrioque no, ne usu adolescens voluptaria. Deleniti complectitur id est, numquam pertinacia voluptaria ei vel. Ancillae consetetur mei ut. Eu est legimus incorrupte, diceret gubergren ut per. Dolor deseruisse vim ei.",
"Lorem ipsum dolor sit amet, et mel dolorum probatus. Natum oblique luptatum duo ut, possit impedit voluptaria in sit. Ut his dicta mucius feugait, ius aperiam offendit mediocritatem cu. Sea errem prodesset eu, an pri vivendo eloquentiam. Ut mel conceptam dissentias. Atqui veniam his et, prompta bonorum detracto ea sit. Duo eros graece fabulas ut, accusam definitionem interpretaris id ius. No sea tale verear, est an purto decore. Ea porro dolor sed, vis vocent utroque id, vim ex affert equidem consetetur.  Brute harum dictas te eos, at duo inani homero vivendum, ei dico perfecto consectetuer vim. Id nec zril expetenda, eos erat libris sententiae id. Legendos consequuntur te duo, sed id libris eligendi suscipiantur. Eum stet populo complectitur ne, has malorum euismod deleniti ei. Eu amet fabulas oportere sea. In elit invidunt definitiones sed. Natum facilis ex eum, ignota ceteros scriptorem ex duo. Cu pro exerci nemore aliquam. Cu quis splendide ullamcorper sit, eam dolorem fierent ea, ei possit placerat fabellas sed. Et graece malorum pri. Salutatus hendrerit ne sit. Aeterno pertinax dissentiunt cu pro. Ius exerci maluisset patrioque no, ne usu adolescens voluptaria. Deleniti complectitur id est, numquam pertinacia voluptaria ei vel. Ancillae consetetur mei ut. Eu est legimus incorrupte, diceret gubergren ut per. Dolor deseruisse vim ei.",
"Lorem ipsum dolor sit amet, et mel dolorum probatus. Natum oblique luptatum duo ut, possit impedit voluptaria in sit. Ut his dicta mucius feugait, ius aperiam offendit mediocritatem cu. Sea errem prodesset eu, an pri vivendo eloquentiam. Ut mel conceptam dissentias. Atqui veniam his et, prompta bonorum detracto ea sit. Duo eros graece fabulas ut, accusam definitionem interpretaris id ius. No sea tale verear, est an purto decore. Ea porro dolor sed, vis vocent utroque id, vim ex affert equidem consetetur.  Brute harum dictas te eos, at duo inani homero vivendum, ei dico perfecto consectetuer vim. Id nec zril expetenda, eos erat libris sententiae id. Legendos consequuntur te duo, sed id libris eligendi suscipiantur. Eum stet populo complectitur ne, has malorum euismod deleniti ei. Eu amet fabulas oportere sea. In elit invidunt definitiones sed. Natum facilis ex eum, ignota ceteros scriptorem ex duo. Cu pro exerci nemore aliquam. Cu quis splendide ullamcorper sit, eam dolorem fierent ea, ei possit placerat fabellas sed. Et graece malorum pri. Salutatus hendrerit ne sit. Aeterno pertinax dissentiunt cu pro. Ius exerci maluisset patrioque no, ne usu adolescens voluptaria. Deleniti complectitur id est, numquam pertinacia voluptaria ei vel. Ancillae consetetur mei ut. Eu est legimus incorrupte, diceret gubergren ut per. Dolor deseruisse vim ei.",
"Hello there!"
]

export default function TextSection(props) {
    const text = props.textId;

    return (
        <div
            style={{marginBottom:'10vh'}}
        >
            {text_bank[text]}
        </div>

    );
    

}