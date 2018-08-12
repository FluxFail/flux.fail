function operations(delayService) {
  let operations = {
    GET
  };
 
  function GET(req, res, next) {
    res.status(200).json(delayService.getDelays(req.query.limit, req.query.offset, req.query.userid));
  }
  return operations;
 
  GET.apiDoc = `
    tags:
    - "delay"
    summary: "Requests a limited list of delays starting with an offset"
    produces:
    - "application/json"
    parameters:
    - name: "limit"
      in: "query"
      description: "The maximum amount of delays that are expected"
      required: false
      type: "string"
    - name: "offset"
      in: "query"
      description: "The offset of delays"
      required: false
      type: "string"
    - name: "userid"
      in: "query"
      description: "The id of the requesting user"
      required: true
      type: "integer"
    responses:
      200:
        description: "successful operation"
        schema:
          type: "array"
          items:
            $ref: "#/definitions/Delay"
      422:
        description: "Limit must be below 100"
  `;
}

exports.operations = operations;